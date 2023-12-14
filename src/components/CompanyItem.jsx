import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setModal } from "../slice/companySlice";

const CompanyItem = (company) => {
  const { name, address, image, scale, country, ot, website, social } = company;

  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(setModal({ show: true, data: company }));
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardMedia
        component="img"
        alt="Company Logo"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: <b>{address}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Scale: <b>{scale}km</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Country: <b>{country}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overtime: <b>{ot}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Website: <b>{website}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Social: <b>{social}</b>
        </Typography>
      </CardContent>

      <Button variant="contained" onClick={handleUpdate} fullWidth>
        View Details
      </Button>
    </Card>
  );
};

export default CompanyItem;
