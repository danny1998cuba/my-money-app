// import { MainLayout } from "./layout/MainLayout";
import { HashRouter } from 'react-router-dom'
import Routes from './data/routes'

function App() {

  return (
    <HashRouter>
      {/* <MainLayout>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ipsum quis vero rerum tempora, aspernatur veritatis possimus, aut voluptas obcaecati consequuntur facilis eos ratione ullam sunt veniam nisi ab dignissimos eum? Itaque, dicta. Consectetur quia consequuntur tempora animi earum magni ratione. Reiciendis labore praesentium sit animi suscipit omnis, consectetur nihil!</p>
        <img src="./images/logo.svg" alt="" width="300" className="img-fluid" />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti dolores porro laudantium perferendis iste neque laborum nobis explicabo ex soluta nihil consequatur, animi minima quis ipsa nemo consectetur commodi quia adipisci harum?</p>
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Column 1</th>
                <th scope="col">Column 2</th>
                <th scope="col">Column 3</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td>R1C1</td>
                <td>R1C2</td>
                <td>R1C3</td>
              </tr>
              <tr className="">
                <td>Item</td>
                <td>Item</td>
                <td>Item</td>
              </tr>
              <tr className="">
                <td>Item</td>
                <td>Item</td>
                <td>Item</td>
              </tr>
              <tr className="">
                <td>Item</td>
                <td>Item</td>
                <td>Item</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero porro rerum odit modi maiores quibusdam deleniti aliquam cumque natus molestias.</p>

      </MainLayout> */}
      <Routes />
    </HashRouter>
  );
}

export default App;
