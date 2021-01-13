// describe('Tier One: Properties', () => {
//     // We'll use this array of properties as dummy data for testing purposes
//     const properties = [
//       {
//         id: 1,
//         name: 'Century Chalet',
//         imageUrl: 'https://tinyurl.com/y6636nbd',
//         address: '1741 Remarkable Rd',
//         price: 3000000,
//       },
//       {
//         id: 2,
//         name: 'Holiday House',
//         imageUrl: 'https://tinyurl.com/y6jeheeg',
//         address: '2011 Vacation Ct',
//         price: 6000000,
//       },
//     ]
//     beforeEach(() => {
//       // mockAxios ensures that when our client-side code requests data from the
//       // server, the request is always successful (even if we haven't implemented)
//       // our server yet.
//       mockAxios.onGet('/api/properties').replyOnce(200, properties)
//     })

//     describe('<AllProperties /> component', () => {
//         const getPropertiesSpy = sinon.spy()
//         afterEach(() => {
//           getPropertiesSpy.resetHistory()
//         })

//         // This test is interested in the unconnected AllProperties component. It is
//         // exported as a named export in client/components/all-properties.js
//         it('renders the properties passed in as props', () => {
//           const wrapper = mount(
//             <UnconnectedAllProperties
//               properties={properties}
//               getProperties={getPropertiesSpy}
//             />
//           )
//           expect(wrapper.text()).to.include('Century Chalet')
//           expect(wrapper.text()).to.include('Holiday House')
//           // The test is expecting an image for each Property, with src set to the
//           // Property's imageUrl
//           const images = wrapper.find('img').map((node) => node.get(0).props.src)
//           expect(images).to.include.members([
//             'https://tinyurl.com/y6636nbd',
//             'https://tinyurl.com/y6jeheeg',
//           ])
//         }
//       }
