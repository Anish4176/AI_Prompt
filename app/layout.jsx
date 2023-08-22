import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/global.css';


export const metadata={
  icons: {
    icon: './assets/icons/favicon.ico',
  },
    title:'Apnaprompt',
    description:'Discover and share AI prompts'
}

function Layout({children}) {
  return (
    <html lang='en'>
        <body>
          <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>

          <main className='app'>
            <Nav/>
            {children}
          </main>
          </Provider>
        </body>
    </html>
    
  )
}

export default Layout