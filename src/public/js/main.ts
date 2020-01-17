import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

// tslint:disable-next-line no-unused-expression
new Vue({
  computed: {
    hazGuitars(): boolean {
      return this.isLoading === false && this.guitars.length > 0;
    },
    noGuitars(): boolean {
      return this.isLoading === false && this.guitars.length === 0;
    }
  },
  data(): any {
    return {
      brand: "",
      color: "",
      guitars: [],
      isLoading: true,
      model: "",
      selectedGuitar: "",
      selectedGuitarId: 0,
      year: ""
    };
  },
  el: "#app",
  methods: {
    addGuitar(): void {
      const guitar = {
        brand: this.brand,
        color: this.color,
        model: this.model,
        year: this.year
      };
      axios
        .post("/api/guitars/add", guitar)
        .then(() => {
          this.$refs.year.focus();
          this.brand = "";
          this.color = "";
          this.model = "";
          this.year = "";
          this.loadGuitars();
        })
        .catch((err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });
    },

    confirmDeleteGuitar(id: string): void {
      const guitar = this.guitars.find((g: any) => g.id === id);
      this.selectedGuitar = `${guitar.year} ${guitar.brand} ${guitar.model}`;
      this.selectedGuitarId = guitar.id;
      const dc = this.$refs.deleteConfirm;
      const modal = M.Modal.init(dc);
      modal.open();
    },

    deleteGuitar(id: string): void {
      axios
        .delete(`/api/guitars/remove/${id}`)
        .then(this.loadGuitars)
        .catch((err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });
    },

    loadGuitars(): void {
      axios
        .get("/api/guitars/all")
        .then((res: any) => {
          this.isLoading = false;
          this.guitars = res.data;
        })
        .catch((err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });
    }
  },

  mounted(): any {
    return this.loadGuitars();
  }
});
