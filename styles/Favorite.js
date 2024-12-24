export const FavoriteStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 50,
      },
      containerLight: {
        backgroundColor: '#5fafdd',
      },
      containerDark: {
        backgroundColor: '#333',
      },
      backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1,
        padding: 10,
      },
      backArrow: {
        fontSize: 30,
        color: 'black',
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
        textAlign: 'center',
      },
      listContainer: {
        paddingBottom: 12,
      },
      noFavoritesText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 12,
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        padding: 3,
      },
      cardDark: {
        backgroundColor: '#444',
      },
      leftSection: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
      },
      weatherImage: {
        height: 90,
        width: 90,
        marginBottom: 1,
      },
      weatherDetails: {
        alignItems: 'center',
      },
      dailyForecastTemp: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
      },
      dailyForecastCondition: {
        fontSize: 14,
        color: 'gray',
        marginTop: 6,
      },
      cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 50,
      },
      cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
      removeButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
      },
      removeButtonDark: {
        backgroundColor: '#c0392b',
      },
      removeButtonText: {
        color: '#fff',
        fontSize: 14,
      },
      textDark: {
        color: '#fff',
      },

});