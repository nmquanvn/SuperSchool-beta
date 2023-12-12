const PageHeader = (props) => {
  return (
    <section className="inner-banner">
      <div className="container d-flex align-items-center">
        <h2 className="inner-banner__title">{props.title}</h2>
      </div>
    </section>
  );
};

export default PageHeader;
