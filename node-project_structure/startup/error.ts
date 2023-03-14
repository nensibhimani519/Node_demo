export default () => {
    process.on('unhandledRejection', (ex: Error) => {
        throw ex;
    });    
}