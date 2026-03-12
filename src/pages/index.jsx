import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import CaseWizard from "./CaseWizard";

import DraftEditor from "./DraftEditor";

import Citations from "./Citations";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import  SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

const PAGES = {
    
    Dashboard: Dashboard,
    
    CaseWizard: CaseWizard,
    
    DraftEditor: DraftEditor,
    
    Citations: Citations,

    SignIn: SignIn,

    SignUp: SignUp,
    
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

    if (location.pathname === "/" || location.pathname.toLowerCase() === "/signup") {
        return (
            <Routes>
                <Route path="/" element={<SignIn />} />

                 <Route path="/signup" element={<SignUp />} />
            </Routes>
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
        <Router>
            <PagesContent />
        </Router>
    );
}