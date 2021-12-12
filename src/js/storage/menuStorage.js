export default class MenuStorage {
  baseUrl = "http://localhost:3000";

  constructor(category) {
    this.category = category;
  }

  getCategory = () => {
    return this.category;
  };

  fetchAll = async () => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  };

  remove = async (id, name) => {
    const url = `${this.baseUrl}/api/category/${this.category}/menu/${id}`;
    const response = await fetch(url, {
      method: "delete",
      body: JSON.stringify({
        name: name,
      }),
    });
    const result = await response.text();
    return result;
  };

  soldOutById = (id) => {
    const menu = this.datas.find((m) => m.id == id);
    const menuIdx = this.datas.findIndex((m) => m.id == id);
    if (menu) {
      menu.soldOut = !menu.soldOut;
      this.datas[menuIdx] = menu;
      this.storage.setItem(this.category, JSON.stringify(this.datas));
    }
  };

  editMenuName = (id, name) => {
    const menu = this.datas.find((m) => m.id == id);
    const menuIdx = this.datas.findIndex((m) => m.id == id);
    if (menu) {
      menu.menuName = name;
      this.datas[menuIdx] = menu;
      this.storage.setItem(this.category, JSON.stringify(this.datas));
    }
  };

  add = (menuName) => {
    const menuData = {
      id: this.datas.length == 0 ? 0 : this.datas[this.datas.length - 1].id + 1,
      menuName: menuName,
      soldOut: false,
    };
    const updatedDatas = [...this.datas, menuData];
    this.storage.setItem(this.category, JSON.stringify(updatedDatas));
    this.datas = updatedDatas;
    return menuData;
  };
}