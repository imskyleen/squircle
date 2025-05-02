export const Footer = () => {
  return (
    <div className="sm:h-16 h-24 w-full border-t flex items-center">
      <div className="w-full max-w-7xl text-center mx-auto px-4 md:px-6 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-end gap-2">
        <p className="text-start truncate">
          By{' '}
          <a
            href="https://skyleen.dev"
            rel="noopener noreferrer"
            target="_blank"
            className="underline font-medium text-foreground"
          >
            Skyleen
          </a>
          . The source code is available on{' '}
          <a
            href="https://github.com/imskyleen/squircle"
            rel="noopener noreferrer"
            target="_blank"
            className="underline font-medium text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};
