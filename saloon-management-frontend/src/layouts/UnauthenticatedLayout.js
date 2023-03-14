import Header from "./Header";
import { Container } from "reactstrap";

const UnauthenticatedLayout = ({ children }) => {
  return (
    <main>
      {/********header**********/}
      <Header isAuthenticated={false} />
      <div className="pageWrapper d-lg-flex">
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            {children}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default UnauthenticatedLayout;
