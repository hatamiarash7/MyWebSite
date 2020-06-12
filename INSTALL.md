# Run Ghost in development mode
grunt dev

# Default way of running Ghost in development mode
# Builds admin files on start & then watches for changes

grunt dev --server
# Ignores admin changes

grunt dev --no-server-watch
# Ignores server changes

grunt build
# Build admin client manually

grunt prod
# Build full Ghost package for production
