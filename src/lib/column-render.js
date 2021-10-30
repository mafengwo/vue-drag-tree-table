export default {
  name: "ColumnRender",
  props: {
    render: Function,
    row: Object,
    index: Number,
  },

  render: function () {
    let _self = this;
    return this.render.call(this._renderProxy, {
      row: _self.row,
      columnIndex: _self.index,
    });
  },
};
