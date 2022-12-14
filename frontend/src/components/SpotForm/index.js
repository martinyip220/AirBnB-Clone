import { useDispatch } from "react-redux";
import "./SpotForm.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createNewSpot } from "../../store/spots";

const SpotForm = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const validations = () => {
    const errors = [];
    if (address.length < 5)
      errors.push("Please enter an address with a length greater than 5");
    if (city.length < 5)
      errors.push("Please enter a city with a length greater than 5");
    if (state.length < 2)
      errors.push("Please enter a state with a length greater than 1");
    if (country.length < 2)
      errors.push("Please enter a country with a length greater than 1");
    if (name.length < 5)
      errors.push("Please enter a name with a length greater than 5");
    if (description.length < 10)
      errors.push("Please enter a description with a length greater than 10");
    if (price < 1)
      errors.push("Please enter a price greater than or equal to 1");
    if (!previewImage) errors.push("Please enter a valid image url");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      lat: 94.022,
      lng: 50.739,
      previewImage:
        "https://a0.muscache.com/im/pictures/miso/Hosting-603906401684897231/original/fc219b06-f81e-42d3-b544-5b3f8c0017f2.jpeg?im_w=1200",
    };

    const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    return dispatch(createNewSpot(newSpot))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const newSpot = await res.json();
        if (newSpot && newSpot.errors) {
          setErrors(newSpot.errors);
        }
      });
  };

  return (
    <>
      <div className="whole-page">
        <div className="create-spot-page">
          <div className="create-spot-title">
            <h1>Create a Spot</h1>
          </div>
          <form className="create-spot-form" onSubmit={handleSubmit}>
            <ul className="create-spot-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="number"
                className="create-spot-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={1}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="create-spot-input"
                placeholder="Placeholder img will be displayed regardless of url"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
              />
            </label>
            <button className="create-spot-button" type="submit">
              Create Spot
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SpotForm;
