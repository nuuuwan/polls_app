import os

from utils import filex, timex

VERSION_FILE_NAME = "src/constants/Version.js"


def update_version():
    last_update = timex.format_time(
        timex.get_unixtime(),
        '%Y-%m-%d %H:%M',
    )
    filex.write(
        VERSION_FILE_NAME,
        f'export const DATE_LAST_UPDATE = "{last_update}";',
    )
    print(f'Wrote {VERSION_FILE_NAME}')
    return last_update


def git_update(last_update):
    os.system(f'git add {VERSION_FILE_NAME}')
    os.system(f'git commit -m "[update_version] Updated to {last_update}"')


if __name__ == '__main__':
    last_update = update_version()
    git_update(last_update)
