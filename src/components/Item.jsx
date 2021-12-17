import { Card, CardTitle, CardText, Button } from "reactstrap";

export const Item = () => {
  return (
    <div>
      <Card
        body
        inverse
        style={{
          backgroundColor: "#333",
          borderColor: "#333",
        }}
      >
        <CardTitle tag="h5">Team OpenSeas</CardTitle>
        <CardText>
          Help Mr.Beast and team to make the water bodies cleaner!
        </CardText>
        <Button>View Details</Button>
      </Card>
    </div>
  );
};
