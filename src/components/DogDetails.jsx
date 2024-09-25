import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_KEY } from '../config/config.js';

function DogDetails() {
  const { chipNumber } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ef402ae41b4d34e434958e', {
      headers: {
        'X-Master-Key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const selectedDog = data.record.find(dog => dog.chipNumber === chipNumber);
        setDog(selectedDog);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [chipNumber]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.img} alt={dog.breed} className="dog-detail-image" />
      <p><strong>Breed:</strong> {dog.breed}</p>
      <p><strong>Age:</strong> {dog.age}</p>
      <p><strong>Sex:</strong> {dog.sex}</p>
      <p><strong>Present:</strong> {dog.present ? "Yes" : "No"}</p>
      <h3>Owner Information</h3>
      <p><strong>Name:</strong> {dog.owner.name} {dog.owner.lastName}</p>
      <p><strong>Phone:</strong> {dog.owner.phoneNumber}</p>
    </div>
  );
}

export default DogDetails;
