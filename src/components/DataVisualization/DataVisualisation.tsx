import { Alert, Button, CircularProgress, Container } from "@mui/material";
import Refresh from "@mui/icons-material/Refresh";
import CatsItemsList from "../CatListItems/CatListItems";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ICats } from "../../types/cat.types";
import config from '../../config/config';

const DataVisualization = () => {
  const [ data, setData ] = useState<ICats>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>("");

  const getCatsData = async () => {
    setIsLoading(true);
    try{
      const cats = await axios.get(config.catFactsApiUrl);
      setIsLoading(false);
      if(cats?.data){
        setData(cats.data);
      } else {
        setError("Network error");
      }
    }catch(err: any){
      setIsLoading(false);
      setError(err?.message);
    }
  }
  useEffect(() => {
    getCatsData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress data-testid="loader-test-id"/>;
    }
  
    if (error) {
      return (
        <Alert variant="filled" severity="error">
          {`Error: Opps something went Wrong - ${error}`}
        </Alert>
      );
    }

    if(!data){
      return <>No Data Found</>
    }
    return (
      <CatsItemsList data={data} />
    )
  }
  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        onClick={() => getCatsData()}
        endIcon={<Refresh />}
      >
        Refresh
      </Button>
      {renderContent()}
    </Container>
  );
};

export default DataVisualization;
