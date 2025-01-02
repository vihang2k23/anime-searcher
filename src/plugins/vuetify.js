import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure Vuetify's global styles are imported
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'; // Import Material Design Icons

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Set 'mdi' as the default icon set
    aliases, // Define any custom aliases for icons if needed
    sets: {
      mdi, // Register the mdi (Material Design Icons) icon set
    },
  },
});
