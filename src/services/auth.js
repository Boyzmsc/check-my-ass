import {firebaseAuth, googleProvider} from './firebase'; 

class Auth {
    login(name) {
        const provider = this.getProvider(name);
        return firebaseAuth.signInWithPopup(provider);
    } 
    getProvider(name){
        switch(name){
          case 'Google':
            return googleProvider;
          default:
            throw new Error(`${name} is unknown provider.`);
        }
    }
    logout() {
        firebaseAuth.signOut();
    }

    onAuthChange = (callback) => { 
        // 로그아웃된 상태면 user는 null임
        firebaseAuth.onAuthStateChanged(user => {
            callback(user);
        })
    }
};
export default Auth;