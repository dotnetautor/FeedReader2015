using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;

using FeedReader.Xamarin.Forms.Utilities;
using FeedReader.Xamarin.Forms.ViewModels;
using UniversalFeedReader.Models;
using Xamarin.Forms;

namespace FeedReader.Xamarin.Forms.Pages {
  public class FeedOverview : ContentPage {
    public FeedOverview() {

      var refreshButton = new Button {
        HorizontalOptions = LayoutOptions.FillAndExpand,
        VerticalOptions = LayoutOptions.Center,
        Text = "Refresh"
      };
      refreshButton.SetBinding(Button.CommandProperty, "RefreshCommand");

      var template = new DataTemplate(typeof(TextCell));
      // We can set data bindings to our supplied objects.
      template.SetBinding(TextCell.TextProperty, "Title");
      template.SetBinding(TextCell.DetailProperty, "Description");

      var listView = new ListView {ItemTemplate = template};
      listView.SetBinding(ListView.ItemsSourceProperty, "FeedItems");

      // Push the list view down below the status bar on iOS.
      Padding = new Thickness(10, Device.OnPlatform(20, 0, 0), 10, 5);
      Content = new Grid {
        BindingContext = new FeedReaderViewModel(),

        RowDefinitions = new RowDefinitionCollection {
         new RowDefinition { Height = new GridLength (1, GridUnitType.Star) },
         new RowDefinition { Height = new GridLength (0, GridUnitType.Auto) },

       },
        Children = {
           new ViewWithGridPosition(listView, 0,0),
           new ViewWithGridPosition(refreshButton, 1,0)
         },
      };
    }
    
    
  }
}
