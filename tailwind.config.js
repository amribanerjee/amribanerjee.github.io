tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Courier New', 'Courier', 'monospace'],
            },
            colors: {
                background: 'var(--bg-color)',
                foreground: 'var(--fg-color)',
                muted: 'var(--muted-color)',
                border: 'var(--border-color)',
                card: 'var(--card-bg)'
            }
        }
    }
}
