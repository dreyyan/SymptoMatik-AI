## Run Backend
```powershell
uvicorn backend.main:app --reload
```

## Install Dependencies
```powershell
pip install fastapi uvicorn
pip install sqlalchemy psycopg2
pip install sqlalchemy-utils
pip install pandas
pip install sqlalchemy[asyncio] asyncpg psycopg2-binary
pip install passlib
pip install bcrypt
```