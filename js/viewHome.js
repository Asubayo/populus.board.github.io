
class ViewHome
{
	constructor()
	{
		this.name = "Home";
		// The root element
		this.app = document.getElementById('Home')


		const h = document.createElement('h3')
		h.textContent = "Home";
		this.app.appendChild(h);
		const p = document.createElement('p');
		p.textContent = 'London is the capital city of England.';
		this.app.appendChild(p);
	}
}
