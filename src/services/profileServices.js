import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

export async function getUserProfile(username) {
    console.log('Fetching profile for username:', username);
    try {
        if (!pb.authStore.isValid) {
            console.error('User is not authenticated');
            throw new Error('User is not authenticated');
        }
        
        const user = await pb.collection("users").getFirstListItem(`username="${username}"`);
        console.log('Fetched user:', user);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address || '',
            avatar: user.avatar || '',
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        console.error('Error details:', error.data);
        throw error;
    }
    
};

export async function updateUserProfile(username, formData) {
    console.log('updateUserProfile called with:', { username, formData });
    try {
        const user = await pb.collection('users').getFirstListItem(`username="${username}"`);
        console.log('Found user:', user);

        const updatedUser = await pb.collection("users").update(user.id, formData);

        console.log('User updated successfully:', updatedUser);


        return {
            username: updatedUser.username,
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            address: updatedUser.address || '',
            avatar: updatedUser.avatar || '',
        };
    } catch (error) {
        console.error('Error updating user profile:', error);
        if (error.data) {
            console.error('Error details:', error.data);
            if (error.data.email) {
                throw new Error(`Email error: ${error.data.email.message}`);
            }
            if (error.data.avatar) {
                throw new Error(`Avatar error: ${error.data.avatar.message}`);
            }
        }
        throw error;
    }
}

export async function deleteUserAccount(id) {
    try {
         await pb.collection('users').delete(id);
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error;
    }
}