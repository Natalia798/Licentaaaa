import { sampleProducts } from "./Data";

// Methods of this class are used to simulate calls to server.

class Api {
  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  searchItems({
    category = "popular",
    term = "",
    itemsPerPage = 12,
    page = 1
  }) {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = sampleProducts.filter(item => {
          if (category === "popular") {
            return item.popular;
          }
          if(category === "suggested") {
            return item.suggested
          }

          if (category !== "All categories" && category !== item.category)
            return false;

          if (term && !item.author.toLowerCase().includes(term.toLowerCase()) && !item.name.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();