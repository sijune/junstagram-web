import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

function PageTitle({ title }) {
  return (
    <Helmet>
      <title> {title} | Junstagram </title>
    </Helmet>
  );
}

// prop 체크
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
