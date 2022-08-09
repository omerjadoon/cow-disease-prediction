import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
    toptext:{
        fontSize:18,
        color:'#b68873',
        fontWeight:'bold',
        marginRight:50,
        alignSelf:'center'

    },
    homecard:{

    },
    formContainer: {
        flexDirection: 'row',
        width:'95%',
        
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius:10,

    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#b68873',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    mainContainer:{
        width: '100%',
        height:'80%',
        padding:5,
        flexDirection:'row',
        flexWrap:'wrap'
        
    }
})