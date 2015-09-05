using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;
//using FeedReader.Xamarin.Forms.Pages;

namespace FeedReader.Xamarin.Forms
{
	public class App : Application {
		public App() {
			// The root page of your application
		//	MainPage = new FeedOverview();
    MainPage = new ContentPage {
         Content = new Label
        {
          Text = "Hello, Forms!",
          VerticalOptions = LayoutOptions.CenterAndExpand,
          HorizontalOptions = LayoutOptions.CenterAndExpand,

        }
      };

    }

		protected override void OnStart() {
			// Handle when your app starts
		}

		protected override void OnSleep() {
			// Handle when your app sleeps
		}

		protected override void OnResume() {
			// Handle when your app resumes
		}
	}
}
