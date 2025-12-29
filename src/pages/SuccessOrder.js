import Header from "../components/Header";
import Footer from "../components/Footer";
import SuccessOrderContainer from "../components/SuccessOrder/SuccessOrderContainer";

function SuccessOrder() {
    return <div className="success-order-page">
        <Header/>
        <Breakline/>
        <Footer/>
        <SuccessOrderContainer/>
    </div>
};

export default SuccessOrder;