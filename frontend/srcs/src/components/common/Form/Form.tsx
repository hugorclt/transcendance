export default function Form({ children, formData, setFormData}) {
  const handleInputChange = (key, text) => {
    let newFormData = { ...formData };
    newFormData[key] = text;
    setFormData(newFormData);
  };

  const mappedChildren = children.map((child) => {
    return {
      ...child,
      props: {
        ...child.props,
        onChange: (e) => handleInputChange(child.key, e.target.value),
        value: formData ? formData[child.key] : "",
      },
    };
  });

  return <section>{mappedChildren}</section>;
}
