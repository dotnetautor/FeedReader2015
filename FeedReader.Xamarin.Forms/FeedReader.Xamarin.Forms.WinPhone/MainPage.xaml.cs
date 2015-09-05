using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace FeedReader.Xamarin.Forms.WinPhone {
  public class ProxyPage : global::Xamarin.Forms.Platform.WinPhone.FormsApplicationPage { }

  public partial class MainPage : ProxyPage {
    public MainPage() {
      InitializeComponent();
      SupportedOrientations = SupportedPageOrientation.PortraitOrLandscape;

      global::Xamarin.Forms.Forms.Init();
      LoadApplication(new FeedReader.Xamarin.Forms.App());
    }
  }
}
