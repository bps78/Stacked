import { useUser } from "@clerk/clerk-expo";


function updateMetaData(){
    const {user} = useUser();

    console.log('Update Meta Data Start')
    user.update({firstName: 'Joe'});
   

       
//         user.update({
//             unsafeMetadata: {stocks: arrValue},
//         }).catch((err) => console.log('ERROR'));
       
   }

   export default updateMetaData;