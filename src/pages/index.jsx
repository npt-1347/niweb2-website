import Layout from "./Layout.jsx";

import Home from "./Home";

import Dashboard from "./Dashboard";

import CaseWizard from "./CaseWizard";

import DraftEditor from "./DraftEditor";

import Citations from "./Citations";

import ScoreMyCase from "./ScoreMyCase";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import  SignIn from "./SignIn.jsx";

import SignUp from "./SignUp.jsx";

import NavigationBar from "@/components/common/NavigationBar.jsx";

import Footer from "@/components/common/Footer.jsx";

const PAGES = {
    
    Dashboard: Dashboard,
    
    CaseWizard: CaseWizard,
    
    DraftEditor: DraftEditor,
    
    Citations: Citations,

    ScoreMyCase: ScoreMyCase,

    SignIn: SignIn,

    SignUp: SignUp,

    Home: Home,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    if (
        location.pathname === "/" ||
        location.pathname.toLowerCase() === "/signin" ||
        location.pathname.toLowerCase() === "/signup" ||
        location.pathname.toLowerCase() === "/score-my-case"
    ) {
        return (
            <>
             <NavigationBar />
 <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/score-my-case" element={<ScoreMyCase />} />
            </Routes>
            <Footer />

            </>
           
        );
    }
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/dashboard" element={<Dashboard />} />
                
                <Route path="/casewizard" element={<CaseWizard />} />
                
                <Route path="/drafteditor" element={<DraftEditor />} />
                
                <Route path="/citations" element={<Citations />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router basename="/niweb2-website">
            <PagesContent />
        </Router>
    );
}