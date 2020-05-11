import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { firestoreConnect, useFirebase } from 'react-redux-firebase';

import './Profile.scss';
import OwnProfile from '../../components/ownProfile/OwnProfile';
import ProfileForm from '../../components/profileForm/ProfileForm';

export function Profile(props) {
    const [editMode, setEditMode] = useState(false);
    const firebase = useFirebase();

    const handleProfileUpdate = (payload) => {
        firebase.updateProfile(payload);
        setEditMode(false);
    }

    const handleLogout = () => {
        firebase.logout();
    }

    if (editMode) {
        return <ProfileForm profile={props.profile} handleUpdate={handleProfileUpdate} setEditMode={setEditMode}/>
    }

    return (
        <Fragment>
            <OwnProfile profile={props.profile} setEditMode={setEditMode} logout={handleLogout}/>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.firestore.data.categories, //?
        profile: state.firebase.profile,
    }
}

// Adding automatic listeners to 'categories' collection
const enhance = compose(
    firestoreConnect((props) => [
        { collection: 'categories' }
    ]),
    connect(mapStateToProps)
)

export default withRouter(enhance(Profile));