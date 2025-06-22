#!/bin/bash
echo "🚀 Testing Multilingual Blog Setup..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test if _site directory was created
if [ -d "_site" ]; then
    echo "✅ Build output directory created"
    echo "📁 Generated files:"
    find _site -name "*.html" | head -10
else
    echo "❌ Build output directory not found"
    exit 1
fi

echo ""
echo "🎉 Setup test completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start development server: npm start"
echo "2. Open http://localhost:8080 in your browser"
echo "3. Begin adding your content in src/posts/"
echo ""
echo "For VS Code dev container usage:"
echo "1. Open project in VS Code"
echo "2. Install 'Dev Containers' extension"
echo "3. Reopen in container when prompted"