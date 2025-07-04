$images = @(
    @{
        url = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
        filename = "mentor1.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
        filename = "mentor2.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop"
        filename = "mentor3.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
        filename = "mentor4.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        filename = "mentor5.jpg"
    },
    @{
        url = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
        filename = "mentor6.jpg"
    }
)

Write-Host "Starting image downloads..."

foreach ($image in $images) {
    try {
        Write-Host "Downloading $($image.filename)..."
        Invoke-WebRequest -Uri $image.url -OutFile $image.filename
        Write-Host "Successfully downloaded $($image.filename)"
    }
    catch {
        Write-Host "Error downloading $($image.filename): $_"
    }
}

Write-Host "All downloads completed!" 