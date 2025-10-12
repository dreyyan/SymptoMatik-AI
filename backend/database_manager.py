from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, MetaData, Table, inspect, text
from sqlalchemy_utils import database_exists, create_database, drop_database
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
import pandas as pd
import os
from typing import List, Dict, Optional, Any

# Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:qwpoeriuty123@localhost:5432/symptomatik"
)
naming_conventions = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

# Base class for models
class Base(DeclarativeBase):
    metadata = MetaData(naming_convention=naming_conventions)

# Database engine and session factory
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    """Dependency for FastAPI to get database session"""
    async with AsyncSessionLocal() as session:
        yield session

async def check_database_exists(name: str) -> bool:
    """Check if a database exists"""
    return database_exists(f"{DATABASE_URL.split('/postgres')[0]}/{name}")

async def create_new_database(name: str) -> None:
    """Create a new database"""
    url = f"{DATABASE_URL.split('/postgres')[0]}/{name}"
    if not database_exists(url):
        create_database(url)
    else:
        raise HTTPException(status_code=400, detail=f"Database '{name}' already exists")

async def drop_selected_database(name: str) -> None:
    """Drop a database after terminating connections"""
    if not await check_database_exists(name):
        raise HTTPException(status_code=404, detail=f"Database '{name}' does not exist")

    default_engine = create_async_engine(f"{DATABASE_URL.split('/postgres')[0]}/postgres", echo=False)
    async with default_engine.connect() as conn:
        await conn.execution_options(isolation_level="AUTOCOMMIT")
        await conn.execute(text(f"""
            SELECT pg_terminate_backend(pid)
            FROM pg_stat_activity
            WHERE datname = :dbname
            AND pid <> pg_backend_pid();
        """), {"dbname": name})
        await conn.execute(text(f"DROP DATABASE {name};"))
    await default_engine.dispose()

async def get_databases() -> List[str]:
    """Get list of available databases"""
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT datname FROM pg_database WHERE datistemplate = false;"))
        return [row[0] for row in await result.fetchall()]

async def get_database_details(db_name: str) -> Dict[str, Any]:
    """Get details of a specific database"""
    async with engine.connect() as conn:
        result = await conn.execute(text(f"""
            SELECT
                datname AS database_name,
                pg_size_pretty(pg_database_size(datname)) AS size,
                pg_encoding_to_char(encoding) AS encoding,
                datcollate AS collation,
                datctype AS ctype,
                datistemplate AS is_template
            FROM pg_database
            WHERE datname = :dbname;
        """), {"dbname": db_name})
        details = await result.fetchone()
        if not details:
            raise HTTPException(status_code=404, detail=f"Database '{db_name}' not found")
        return dict(details)

async def get_tables() -> List[str]:
    """List all tables in the current database"""
    async with engine.connect() as conn:
        inspector = inspect(engine)
        return inspector.get_table_names()

async def create_table(table_name: str, columns: List[Column]) -> None:
    """Create a new table"""
    try:
        metadata = MetaData()
        Table(table_name, metadata, *columns)
        async with engine.begin() as conn:
            await conn.run_sync(metadata.create_all)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to create table: {str(e)}")

async def drop_table(table_name: str) -> None:
    """Drop a table"""
    try:
        metadata = MetaData()
        async with engine.connect() as conn:
            table = Table(table_name, metadata, autoload_with=engine)
            await conn.run_sync(metadata.drop_all, tables=[table])
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to drop table: {str(e)}")

async def describe_table_schema(table_name: str) -> List[Dict[str, Any]]:
    """Describe table schema"""
    async with engine.connect() as conn:
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)
        if not columns:
            raise HTTPException(status_code=404, detail=f"Table '{table_name}' not found")
        return [{"name": col['name'], "type": str(col['type']), "nullable": col['nullable']} for col in columns]

async def add_column(table_name: str, col_name: str, col_type: str) -> None:
    """Add a column to a table"""
    col_type_sql = "INTEGER" if col_type.lower() == "int" else "VARCHAR"
    try:
        async with engine.connect() as conn:
            await conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {col_name} {col_type_sql};"))
            await conn.commit()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to add column: {str(e)}")

async def remove_column(table_name: str, col_name: str) -> None:
    """Remove a column from a table"""
    async with engine.connect() as conn:
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)
        if len(columns) <= 1:
            raise HTTPException(status_code=400, detail="Table must have at least one column")
        if col_name not in [col["name"] for col in columns]:
            raise HTTPException(status_code=404, detail=f"Column '{col_name}' not found")
        try:
            await conn.execute(text(f"ALTER TABLE {table_name} DROP COLUMN {col_name};"))
            await conn.commit()
        except SQLAlchemyError as e:
            raise HTTPException(status_code=400, detail=f"Failed to remove column: {str(e)}")

async def rename_table(old_name: str, new_name: str) -> None:
    """Rename a table"""
    try:
        async with engine.connect() as conn:
            await conn.execute(text(f"ALTER TABLE {old_name} RENAME TO {new_name};"))
            await conn.commit()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to rename table: {str(e)}")

async def view_all_rows(session: AsyncSession, table_class: Base) -> List[Dict[str, Any]]:
    """View all rows in a table"""
    rows = (await session.execute(session.query(table_class))).scalars().all()
    if not rows:
        raise HTTPException(status_code=404, detail="No rows found")
    return [{k: v for k, v in row.__dict__.items() if not k.startswith("_")} for row in rows]

async def view_rows_with_filters(session: AsyncSession, table_class: Base, filter_query: str) -> List[Dict[str, Any]]:
    """View rows with filters"""
    try:
        result = await session.execute(text(f"SELECT * FROM {table_class.__tablename__} WHERE {filter_query}"))
        rows = await result.fetchall()
        if not rows:
            raise HTTPException(status_code=404, detail="No rows match the filter")
        return [dict(row) for row in rows]
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to execute query: {str(e)}")

async def update_row(session: AsyncSession, table_class: Base, filter_query: str, updates: Dict[str, Any]) -> int:
    """Update rows"""
    try:
        query = session.query(table_class).filter(text(filter_query))
        rows = (await query.execute()).scalars().all()
        if not rows:
            raise HTTPException(status_code=404, detail="No matching rows found")
        for row in rows:
            for key, val in updates.items():
                setattr(row, key, val)
        await session.commit()
        return len(rows)
    except SQLAlchemyError as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to update rows: {str(e)}")

async def delete_row(session: AsyncSession, table_class: Base, filter_query: str) -> int:
    """Delete rows"""
    try:
        query = session.query(table_class).filter(text(filter_query))
        rows = (await query.execute()).scalars().all()
        if not rows:
            raise HTTPException(status_code=404, detail="No matching rows found")
        count = len(rows)
        for row in rows:
            await session.delete(row)
        await session.commit()
        return count
    except SQLAlchemyError as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to delete rows: {str(e)}")

async def batch_insert(session: AsyncSession, table_class: Base, rows_data: List[Dict[str, Any]]) -> int:
    """Batch insert rows"""
    try:
        objs = [table_class(**data) for data in rows_data]
        session.add_all(objs)
        await session.commit()
        return len(rows_data)
    except SQLAlchemyError as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to insert rows: {str(e)}")

async def insert_row(session: AsyncSession, table_class: Base, data: Dict[str, Any]) -> None:
    """Insert a single row"""
    try:
        new_row = table_class(**data)
        session.add(new_row)
        await session.commit()
    except SQLAlchemyError as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=f"Failed to insert row: {str(e)}")

async def generate_model_class(table_name: str) -> str:
    """Generate SQLAlchemy model class code"""
    try:
        inspector = inspect(engine)
        columns = inspector.get_columns(table_name)
        if not columns:
            raise HTTPException(status_code=404, detail=f"Table '{table_name}' not found")
        
        type_map = {
            "INTEGER": "Integer",
            "VARCHAR": "String",
            "TEXT": "String",
            "FLOAT": "Float",
            "BOOLEAN": "Boolean",
            "TIMESTAMP": "DateTime",
        }
        
        class_name = ''.join(word.capitalize() for word in table_name.split('_'))
        code = f"class {class_name}(Base):\n"
        code += f"    __tablename__ = '{table_name}'\n\n"
        for col in columns:
            col_type = str(col['type']).upper().split("(")[0]
            sqlalchemy_type = type_map.get(col_type, "String")
            code += f"    {col['name']} = Column({sqlalchemy_type}, nullable={col['nullable']}"
            if col['primary_key']:
                code += ", primary_key=True"
            code += ")\n"
        return code
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to generate model: {str(e)}")

async def export_table_data(table_name: str, fmt: str, file_path: str) -> None:
    """Export table data to CSV or JSON"""
    try:
        df = pd.read_sql_table(table_name, engine)
        if fmt.lower() == "csv":
            df.to_csv(file_path, index=False)
        elif fmt.lower() == "json":
            df.to_json(file_path, orient="records", indent=2)
        else:
            raise HTTPException(status_code=400, detail="Invalid format. Must be 'csv' or 'json'")
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to export: {str(e)}")

async def import_table_data(table_name: str, file_path: str) -> int:
    """Import table data from CSV or JSON"""
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File does not exist")
    
    try:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".csv":
            df = pd.read_csv(file_path)
        elif ext == ".json":
            df = pd.read_json(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported format. Use CSV or JSON")
        
        async with engine.begin() as conn:
            await conn.run_sync(df.to_sql, name=table_name, if_exists="append", index=False)
        return len(df)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Failed to import: {str(e)}")

async def search_across_tables(keyword: str) -> List[Dict[str, Any]]:
    """Search for a keyword in all text-like columns"""
    results = []
    try:
        async with engine.connect() as conn:
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            for table in tables:
                columns = inspector.get_columns(table)
                text_cols = [c["name"] for c in columns if "CHAR" in str(c["type"]).upper() or "TEXT" in str(c["type"]).upper()]
                for col in text_cols:
                    sql = text(f"SELECT * FROM {table} WHERE {col} LIKE :kw")
                    result = await conn.execute(sql, {"kw": f"%{keyword}%"})
                    rows = await result.fetchall()
                    if rows:
                        results.append({
                            "table": table,
                            "column": col,
                            "rows": [dict(row) for row in rows]
                        })
        if not results:
            raise HTTPException(status_code=404, detail=f"No matches found for '{keyword}'")
        return results
    except SQLAlchemyError as e:
        raise HTTPException(status_code=400, detail=f"Search failed: {str(e)}")