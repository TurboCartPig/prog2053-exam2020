import {
	LitElement,
	html,
	css,
} from "../../node_modules/lit-element/lit-element.js";
import "./edit-user.js";

class UsersList extends LitElement {
	static get properties() {
		return {
			users: { type: Array },
			selectedUser: { type: Object },
		};
	}

	constructor() {
		super();

		// sett default verdier
		this.users = [];
		this.selectedUser = {
			// den brukeren som er valgt fra lista (klikket på)
			uid: null,
			uname: "",
			firstName: "",
			lastName: "",
			oldPwd: "",
			pwd: "",
		};

		// hent brukere fra server og legg de inn i this.user propertien
		fetch("api/fetchUsers.php")
			.then((response) => response.json())
			.then((data) => (this.users = data))
			.then((data) => console.log(data));
	}

	setSelectedUser(e, user) {
		user.pwd = "";
		user.oldPwd = "";
		this.selectedUser = user;
	}

	static get styles() {
		return css`
			.row {
				display: flex;
			}
			.column {
				width: 50%;
				padding: 100px;
			}
			li {
				cursor: pointer;
				font-size: 22px;
				margin-bottom: 10px;
			}
		`;
	}

	render() {
		return html`
			<div class="row">
				<div class="column">
					<h2>Brukere</h2>
					<ul>
						${this.users.map(
							(user) =>
								html`<li @click="${(e) => this.setSelectedUser(e, user)}">
									${user.uname}
								</li>`
						)}
					</ul>
				</div>
				<div class="column">
					<h2>Rediger bruker</h2>
					<edit-user .user="${this.selectedUser}"></edit-user>
				</div>
			</div>
		`;
	}
}
// Register the new element with the browser.
customElements.define("users-list", UsersList);
