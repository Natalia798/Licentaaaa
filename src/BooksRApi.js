import { books } from "./Recommendations";

// Methods of this class are used to simulate calls to server.

class QuotesApi {
  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = books.filter((x) => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  searchItems({  itemsPerPage = 10, page = 1 }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = books.filter((item) => {
          return true;
        });

        let totalLength = data.length;

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new QuotesApi();
