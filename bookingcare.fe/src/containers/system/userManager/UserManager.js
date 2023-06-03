import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as combinedActions from '../../../store/actions';
import './UserManager.scss';
import UserManagerModal from './UserManagerModal';
import * as constVals from '../../../utilities';
import Commons from '../../../utilities/Commons';
import { FormattedMessage, injectIntl } from 'react-intl';
import withRouterHOC from '../../../hoc/withRouterHOC';
import { compose } from 'redux';
import { apiStates } from '../../../supplies/apiSupplies';

class UserManager extends Component {
	state = {
		openModal: false,
		isUpdate: false,
		userSelected: false,

		allUsers: [],
		// allUsers: constVals.MockAllUsers,
		sortedEmailArr: null,
		sortedNameArr: null,
		usingEmailSorted: false,
		usingNameSorted: false,
		emailOptSelected: constVals.sortTypes.noSorting,
		name1stOptSelected: constVals.sortTypes.noSorting,

		search: '',
	};

	componentDidMount = async () => {
		const { GetAllUsersFn, allUsers } = this.props;
		if (!allUsers) await GetAllUsersFn();
	};

	handleEdit = async (id) => {
		if (id) {
			const { noErrors } = constVals.defaultValues;
			const { getAnUserByIdFn, toggleLoadingGif } = this.props;

			toggleLoadingGif();
			let result = await getAnUserByIdFn(id);

			if (result && result.errCode === noErrors) {
				const isUpdate = true;
				const { positionId, roleId, phoneNumber, ...restData } = result.user;

				const dataForUpdate = {
					...restData,
					phone: result.user.phoneNumber,
					position: result.user.positionId,
					role: result.user.roleId,
					id,
					avatar: Commons.convertBinaryToBase64(restData.avatar),
				};

				this.triggerModalFn(isUpdate, dataForUpdate);
			} else result = { ...apiStates.serverError };
			Commons.onToastTimeoutTrigger({ result, toggleLoadingGif });
		}
	};

	handleDelete = async (id, email) => {
		if (window.confirm(`Do you really want to delete: ${email} ?`)) {
			const { noErrors } = constVals.defaultValues;
			const { toggleLoadingGif, deleteUserByIdFn, GetAllUsersFn } = this.props;

			toggleLoadingGif();
			let result = await deleteUserByIdFn(id);

			if (result && result.errCode === noErrors) {
				await GetAllUsersFn();
			} else result = { ...apiStates.serverError };
			Commons.onToastTimeoutTrigger({ result, toggleLoadingGif });
		}
	};

	handleAddnew = () => {
		this.triggerModalFn();
	};

	triggerModalFn = (isUpdate = false, user = null) => {
		this.setState({
			openModal: !this.state.openModal,
			isUpdate: isUpdate,
			userSelected: isUpdate && user ? user : null,
		});
	};

	renderModal = () => {
		const { openModal, userSelected, isUpdate } = this.state;

		return (
			<UserManagerModal
				isUpdate={isUpdate}
				openModal={openModal}
				userSelected={isUpdate ? userSelected : null}
				resetUserManager={this.resetUserManager}
			/>
		);
	};

	relativelySearch = (obj, searchStr) => {
		for (let key of Object.keys(obj)) {
			if (typeof obj[key] !== constVals.typeKeyValue.numType && obj[key] !== null) {
				if (obj[key].toLowerCase().localeContains(searchStr)) {
					return true;
				}
			}
		}
		return false;
	};

	sortingByActs = (allUsers) => {
		let tempList = null;
		const { sortedEmailArr, sortedNameArr, usingEmailSorted, usingNameSorted } = this.state;

		if (usingEmailSorted && sortedEmailArr && sortedEmailArr.length > 0) {
			tempList = sortedEmailArr;
		} else if (usingNameSorted && sortedNameArr && sortedNameArr.length > 0) {
			tempList = sortedNameArr;
		} else if (allUsers && allUsers.length > 0) {
			tempList = [...allUsers];
		}

		return tempList;
	};

	searchingByActs = (list, searchKey) => {
		const searchKeyConverted = searchKey.toLowerCase();
		const tempList = list.filter((item) => {
			return this.relativelySearch(item, searchKeyConverted);
		});

		return tempList;
	};

	renderAllUsers = (allUsers) => {
		let tempList = this.sortingByActs(allUsers);

		if (this.state.search) {
			tempList = this.searchingByActs(tempList, this.state.search);
		}

		if (tempList) {
			const { editL, deleteL } = constVals.userManagerLangs;
			const { notConnected } = constVals.defaultValues;

			const renderedList = tempList.map((item, idx) => {
				return (
					<tr key={idx}>
						<td>{idx + 1}</td>
						<td>{item.firstname}</td>
						<td>{item.lastname}</td>
						<td>{item.email}</td>
						<td>{item.address}</td>
						<td>
							<div
								className='BTN BTN-default btn-edit'
								onClick={() => this.handleEdit(item.id ? item.id : notConnected)}
							>
								<FormattedMessage id={editL} />
							</div>
							<div
								className='BTN BTN-danger'
								onClick={() => this.handleDelete(item.id ? item.id : notConnected, item.email)}
							>
								<FormattedMessage id={deleteL} />
							</div>
						</td>
					</tr>
				);
			});
			return renderedList;
		} else {
			const numbersOfCols = 9;
			const noData = (
				<tr>
					<td
						colSpan={numbersOfCols}
						className='table-noData'
					>
						No Data
					</td>
				</tr>
			);

			return noData;
		}
	};

	handleSortName = (selectedOne) => {
		const allUsers = this.props.allUsers ? this.props.allUsers : this.state.allUsers;
		const { noSorting, decreasingSort } = constVals.sortTypes;
		let sorted = null;

		if (noSorting !== selectedOne) {
			const listCloned = [...allUsers];
			sorted = listCloned.sort((a, b) => a.firstname.localeCompare(b.firstname));

			if (decreasingSort === selectedOne) {
				sorted = sorted.reverse();
			}
		}

		this.setState({
			name1stOptSelected: selectedOne,
			emailOptSelected: noSorting,
			usingNameSorted: noSorting === selectedOne ? false : true,
			usingEmailSorted: false,
			sortedNameArr: sorted,
		});
	};

	handleSortEmail = (selectedOne) => {
		const allUsers = this.props.allUsers ? this.props.allUsers : this.state.allUsers;

		const { noSorting, decreasingSort } = constVals.sortTypes;
		let sorted = null;

		if (noSorting !== selectedOne) {
			const listCloned = [...allUsers];
			sorted = listCloned.sort((a, b) => {
				const nameA = a.email.split('@')[0].toUpperCase();
				const nameB = b.email.split('@')[0].toUpperCase();
				if (nameA > nameB) return 1;
				if (nameA < nameB) return -1;
				return 0;
			});

			if (decreasingSort === selectedOne) {
				sorted.reverse();
			}
		}

		this.setState({
			emailOptSelected: selectedOne,
			name1stOptSelected: noSorting,
			usingEmailSorted: noSorting === selectedOne ? false : true,
			usingNameSorted: false,
			sortedEmailArr: sorted,
		});
	};

	renderSortSelect = (fieldStr) => {
		const email = 'Email';
		const { noSorting, increasingSort, decreasingSort } = constVals.sortTypes;
		const { noSortingL, increasingL, decreasingL, name1stL } = constVals.userManagerLangs;

		const onChangeType =
			fieldStr === email
				? (event) => this.handleSortEmail(event.target.value)
				: (event) => this.handleSortName(event.target.value);

		const typeOptSelected =
			fieldStr === email ? this.state.emailOptSelected : this.state.name1stOptSelected;

		return (
			<select
				className='custom-select'
				onChange={onChangeType}
				value={typeOptSelected}
			>
				<option value={noSorting}>
					{fieldStr === email ? fieldStr : <FormattedMessage id={name1stL} />}:
					<FormattedMessage id={noSortingL} />
				</option>
				<option value={increasingSort}>
					{fieldStr === email ? fieldStr : <FormattedMessage id={name1stL} />}:
					<FormattedMessage id={increasingL} />
				</option>
				<option value={decreasingSort}>
					{fieldStr === email ? fieldStr : <FormattedMessage id={name1stL} />}:
					<FormattedMessage id={decreasingL} />
				</option>
			</select>
		);
	};

	handleSearch = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	renderSearch = () => {
		const { searchL } = constVals.userManagerLangs;
		return (
			<div className='input-group search-input'>
				<input
					type='text'
					className='form-control'
					placeholder={this.placeholderMesL(searchL)}
					name='search'
					onChange={this.handleSearch}
				/>
				<div className='input-group-append'>
					<button
						className='btn btn-secondary'
						type='button'
					>
						<i className='fa fa-search'></i>
					</button>
				</div>
			</div>
		);
	};

	resetUserManager = () => {
		this.setState({
			isUpdate: false,
			userSelected: false,

			sortedEmailArr: null,
			sortedNameArr: null,
			usingEmailSorted: false,
			usingNameSorted: false,
			emailOptSelected: constVals.sortTypes.noSorting,
			name1stOptSelected: constVals.sortTypes.noSorting,

			search: '',
		});
	};

	placeholderMesL = (mesL) => {
		return this.props.intl.formatMessage({ id: mesL });
	};

	render() {
		const allUsers = this.props.allUsers ? this.props.allUsers : this.state.allUsers;
		const { userManagerL, addNewL, noL, lastnameL, name1stL, addressL, actionL } =
			constVals.userManagerLangs;

		return (
			<div className='userManager-content'>
				<span className='userManager-header'>
					<FormattedMessage id={userManagerL} />
					<br />
				</span>
				{this.renderModal()}
				<div className='feature-group'>
					<div
						className='BTN BTN-primary btn-add'
						onClick={this.handleAddnew}
					>
						<FormattedMessage id={addNewL} />
					</div>
					{this.renderSortSelect('Email')}
					{this.renderSortSelect('Firstname')}
					{this.renderSearch()}
				</div>

				<table className='table table-sm table-hover table-bordered userManager-table'>
					<thead className='table-success'>
						<tr>
							<th scope='col'>
								<FormattedMessage id={noL} />
							</th>
							<th scope='col'>
								<FormattedMessage id={name1stL} />
							</th>
							<th scope='col'>
								<FormattedMessage id={lastnameL} />
							</th>
							<th scope='col'>Email</th>
							<th scope='col'>
								<FormattedMessage id={addressL} />
							</th>
							<th scope='col'>
								<FormattedMessage id={actionL} />
							</th>
						</tr>
					</thead>
					<tbody className='table-tbody'>{this.renderAllUsers(allUsers)}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ adminReducer }) => ({
	allUsers: adminReducer.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
	getAnUserByIdFn: (id) => dispatch(combinedActions.getAnUserByIdFn(id)),
	deleteUserByIdFn: (id) => dispatch(combinedActions.deleteUserByIdFn(id)),
	GetAllUsersFn: () => dispatch(combinedActions.GetAllUsersFn()),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(
	injectIntl,
	withRouterHOC,
	connect(mapStateToProps, mapDispatchToProps),
)(UserManager);
