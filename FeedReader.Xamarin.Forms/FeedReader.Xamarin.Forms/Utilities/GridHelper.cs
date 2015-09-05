using Xamarin.Forms;

namespace FeedReader.Xamarin.Forms.Utilities {

  
  public static class GridExtensions {
    public static void Add(this Grid.IGridList<View> gridList, ViewWithGridPosition v) {
      gridList.Add(v.View, v.Column, v.ColumnSpan + v.Column, v.Row, v.RowSpan + v.Row);
    }
  }
  //
  public class ViewWithGridPosition {
    public ViewWithGridPosition(View view, int row, int column, int rowSpan = 1, int columnSpan = 1) {
      this.View = view;
      this.Row = row;
      this.RowSpan = rowSpan;
      this.Column = column;
      this.ColumnSpan = columnSpan;
    }
    //
    public View View { get; }
    public int Row { get; }
    public int RowSpan { get; }
    public int Column { get; }
    public int ColumnSpan { get; }
  }
}
