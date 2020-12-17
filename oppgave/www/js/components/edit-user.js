import {
	LitElement,
	html,
	css,
} from "../../node_modules/lit-element/lit-element.js";

/*
 * NOTE: There seems to be a ton of bugs and errors in the php part of this task. And i've found it impossible to test if my solution is correct.
 * For example:
 * 1. Apis can return invalid JSON, causing SyntaxErrors
 * 2. Apis do not support POST method so submitting updateUser request is impossible. (Possibly because of CORS)
 */

class EditUser extends LitElement {
	static get properties() {
		return {
			user: { type: Object },
		};
	}

	constructor() {
		super();

		this.user = {};
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
			.form-field {
				padding: 10px;
			}
		`;
	}

	async submit(e) {
		e.preventDefault();

		const form = e.target;

		// Validation of of the request is left to the server
		let url = `api/updateUser.php?id=${this.user.uid}?firstName=${this.user.firstName}?lastName=${this.user.lastName}`;
		// Only send the username if old password was given
		if (this.user.oldPwd)
			url += `?uname=${this.user.uname}?oldPwd=${this.user.oldPwd}`;
    if (this.user.newPwd) url += "?pwd=" + this.user.newPwd;

		const res = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
    });

		// Reset form if successful, or alert the user if unsuccessful
		if (res.status === "success") {
			form.reset();
		} else {
			alert("Something went wrong!\n" + res.msg);
		}
	}

	render() {
		return html`
			<form @submit="${(e) => this.submit(e)}">
				<div class="form-field">
					<label for="username">Username</label>
					<input
						@change="${(e) => (this.user.uname = e.srcElement.value)}"
						type="username"
						name="username"
						value="${this.user.uname}"
						required
					/>
				</div>
				<div class="form-field">
					<label for="firstName">First Name</label>
					<input
						@change="${(e) => (this.user.firstName = e.srcElement.value)}"
						type="text"
						name="firstName"
						value="${this.user.firstName}"
					/>
				</div>
				<div class="form-field">
					<label for="lastName">Last Name</label>
					<input
						@change="${(e) => (this.user.lastName = e.srcElement.value)}"
						type="text"
						name="lastName"
						value="${this.user.lastName}"
					/>
				</div>
				<div class="form-field">
					<label for="oldPwd">Old Password</label>
					<input
						@change="${(e) => (this.user.oldPwd = e.srcElement.value)}"
						type="text"
						name="oldPwd"
						placeholder="Your old/current password"
					/>
				</div>
				<div class="form-field">
					<label for="newPwd">New Password</label>
					<input
						@change="${(e) => (this.user.newPwd = e.srcElement.value)}"
						type="text"
						name="newPwd"
						placeholder="Your new password"
					/>
				</div>
				<div class="form-field">
					<button type="submit">Update</button>
				</div>
				<div class="column"></div>
			</form>
		`;
	}
}
customElements.define("edit-user", EditUser);
