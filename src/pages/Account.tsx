import { Link } from "react-router-dom";

/*
Subscription Plans
Data Privacy Settings
Profile Settings
*/

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Account = () => {
    return (
        <div className="flex flex-row bg-[url('/')] bg-cover bg-center">
            <div className="grid grid-cols-3 gap-1 w-full h-200">
                {/* Header */}
				<Header/>
                {/* Hero Section */}
                <div>
                    <Link to="..">Log out</Link>
                    
                </div>
                {/* Footer */}
                <div className="h-34 row-span-14 col-span-3">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default Account;