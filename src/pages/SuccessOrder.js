import Header from "../components/Header";
import Footer from "../components/Footer";
import SuccessOrderContainer from "../components/SuccessOrder/SuccessOrderContainer";
import Breakline from "../components/Breakline";

function SuccessOrder() {
    return <div className="success-order-page">
        <Header/>
        <Breakline/>
        <Footer/>
        <SuccessOrderContainer/>
    </div>
};

export default SuccessOrder;