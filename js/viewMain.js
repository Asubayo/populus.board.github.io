 class ViewMain
{
	constructor(route, stop) {

		this.tabNames = ["Home", "Etang", "Fondreau"];
		this.createTabs();
		this.createView(route, stop);
		this.displayTabContent();
	}

	createTabs() {

		// The root element
		this.root = document.getElementById('RootContent')

		// Create menu with tabs
		const divTabs = document.createElement('div');
		divTabs.className = 'tab';
		this.root.appendChild(divTabs);

		for(var i = 0; i < this.tabNames.length; i++)
		{
			const btnTab = document.createElement('button');
			btnTab.className = 'tablinks';
			btnTab.textContent = this.tabNames[i];
			divTabs.appendChild(btnTab);

			const divTab = document.createElement('div');
			divTab.id = this.tabNames[i];
			divTab.className = 'tabcontent';
			this.root.appendChild(divTab);

			// Add listners
			(function (tabName) {
				btnTab.addEventListener('click', event => {
					window.location.href = "index.html?route=" + tabName.toLowerCase();
				})
			}(this.tabNames[i])); // immediate invocation
		}
	}

	selectTabFromRoute(route)
	{
		var tabName = "Home";
		
		if (route != "") {

			tabName = route.charAt(0).toUpperCase() + route.slice(1);
		}

		return tabName;
	}

	createView(route, view) {
		var tabName = this.selectTabFromRoute(route);

		if (tabName == "Fondreau" && view == "") {
			this.currentTabView = new ViewFondreau();
		}

		if (tabName == "Fondreau" && view == "map_dorskamp") {
			this.currentTabView = new ViewFondreauDorskamp();
		}

		if (tabName == "Etang") {
			this.currentTabView = new ViewPond();
		}

		if (tabName == "Home") {
			this.currentTabView = new ViewHome();
		}
	}

	displayTabContent() {

		var tabName = this.currentTabView.name;
					
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(tabName).style.display = "block";
		document.getElementById(tabName).className += " active";
	}
}