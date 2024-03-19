import Sidebar from "./Sidebar";

function Layout({ children, activePage }) {
    return (
        <>
            <div className='flex'>
                <Sidebar activePage={activePage} />
                <div className='w-full'>{children}</div>
            </div>
        </>
    );
}

export default Layout;
