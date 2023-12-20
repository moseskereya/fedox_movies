import { useEffect } from 'react'
import { useState } from 'react'
import { ClockIcon } from '@heroicons/react/20/solid'

const Recipes = () => {
  const [recipe, setrecipe] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('salad');

  useEffect(() => {
    const app_id = "d0021928";
    const api_key = "3c5a85a012ba1a0db1c2a1899694b6dc";
    const apiurl = `https://api.edamam.com/search?q=${selectedOption}&app_id=${app_id}&app_key=${api_key}&from=1&to=52&health=alcohol-free`;
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiurl}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setrecipe(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!recipe) {
    return <div>No data available.</div>;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);
  };


  console.log(recipe)

  return (
    <div className="flex w-full min-w-0">
    {loading? (
      <div className="text-center p-4">
        <span>Loading recipes...</span>
      </div>
    ): 
    <div className="w-full p-4 overflow-y-auto">
    <h2 className="sr-only">Recies</h2>
    <section className="flex flex-col md:flex-row justify-between md:items-center">
    <div className="mb-4 py-7">
    <form onSubmit={handleSubmit}>
        <label htmlFor="sortSelect" className="block text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sortSelect"
          name="sortSelect"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="vegetarian">vegetarian</option>
          <option value="cupcake">cupcake</option>
          <option value="recipe">recipe</option>
          <option value="coffee">coffee</option>
          <option value="pizza">pizza</option>
          <option value="vegetable">vegetable</option>
          <option value="beef">beef</option>
          <option value="salad">salad</option>
        </select>
        </form>
      </div>
      <div className="mb-4 py-7">
        <input
          type="text"
          placeholder="Search Recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </section>
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      {recipe.hits.map((rc) => (
        <div key={rc.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
          <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
              src={rc.recipe.image}
              alt={rc.recipe.label}
              className="h-full w-full object-cover object-center"
              loading='lazy'
            />
          </div>
          <div className="pb-4 pt-10">
            <h3 className="text-sm font-medium text-theme">
            <a href={rc.recipe.url}>
            <span aria-hidden="true" className="absolute inset-0" />
                {rc.recipe.label}
            </a>
            </h3>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                <h4 className='text-sm text-gray-500'>Cuisine Type {rc.recipe.cuisineType[0]}</h4>
              </div>
              <div className='flex justify-between items-center'>
              <ClockIcon className='h-4 w-4 m-2 text-theme'/>
              <p className="mt-1 text-sm text-gray-500">{rc.recipe.totalTime}Minutes</p> 
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
 }
  </div>
  )
}

export default Recipes