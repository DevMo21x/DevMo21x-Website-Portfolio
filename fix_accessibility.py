import re

def fix_index():
    with open('src/pages/index.astro', 'r') as f:
        content = f.read()

    # 1. Add aria-hidden to decorative icons
    content = re.sub(r'(<i class="devicon-[^"]+")(>)', r'\1 aria-hidden="true"\2', content)
    content = re.sub(r'(<span class="material-symbols-outlined[^"]*")(>)', r'\1 aria-hidden="true"\2', content)
    
    # SVG icons (GitHub, LinkedIn)
    content = re.sub(r'(<svg class="lucide[^>]+)(>)', r'\1 aria-hidden="true"\2', content)

    # 2. Add scroll-mt-24 to anchors
    content = re.sub(r'id="projects"', r'id="projects" class="scroll-mt-32"', content)
    content = re.sub(r'id="experience"', r'id="experience" class="scroll-mt-32"', content)
    content = re.sub(r'id="certificates"', r'id="certificates" class="scroll-mt-32"', content)
    content = re.sub(r'id="contact"', r'id="contact" class="scroll-mt-32"', content)
    
    # Wait, they already have a class attribute. I should append to the class attribute instead.
    # Ah, the <section> elements have `class="..." id="..."`.
    # It's better to use re.sub on the class string.
    # Actually, simpler:
    content = content.replace('id="projects"', 'id="projects"') # reset
    
    # Let's just do class appending manually
    def add_class(match):
        return match.group(1) + ' scroll-mt-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"'
        
    content = re.sub(r'(class="animate-on-scroll w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto border-t is-visible border-outline-variant)"', 
                     r'\1 scroll-mt-32"', content)
                     
    content = content.replace('class="bg-primary w-full mt-auto relative"', 'class="bg-primary w-full mt-auto relative scroll-mt-32"')

    # 3. Add aria-label to icon-only buttons
    content = content.replace('<button class="md:hidden text-primary">', '<button class="md:hidden text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1" aria-label="Toggle Menu">')
    content = content.replace('<a class="text-on-primary opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all" href="#">\n<span class="material-symbols-outlined" aria-hidden="true">code</span>', '<a class="text-on-primary opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary rounded-sm p-1" href="#" aria-label="Source Code">\n<span class="material-symbols-outlined" aria-hidden="true">code</span>')
    content = content.replace('<a class="text-on-primary opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all" href="#">\n<span class="material-symbols-outlined" aria-hidden="true">link</span>', '<a class="text-on-primary opacity-60 hover:opacity-100 hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary rounded-sm p-1" href="#" aria-label="External Link">\n<span class="material-symbols-outlined" aria-hidden="true">link</span>')

    # 4. Add focus states to ALL links and buttons
    def add_focus(match):
        cls = match.group(2)
        if 'focus-visible' not in cls:
            # If it's on-primary (footer), use ring-on-primary
            ring_color = 'ring-on-primary' if 'text-on-primary' in cls or 'bg-primary' in cls else 'ring-primary'
            return f'{match.group(1)}="{cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:{ring_color} rounded-sm"{match.group(3)}'
        return match.group(0)

    # Re-apply to all links and buttons
    content = re.sub(r'(<a[^>]+class)="([^"]+)"([^>]*>)', add_focus, content)
    content = re.sub(r'(<button[^>]+class)="([^"]+)"([^>]*>)', add_focus, content)

    # Some elements like the interactive cards don't have <a> tags, they are divs.
    # "Interactive elements need keyboard handlers... button for actions"
    # Wait, the cards have "cursor-pointer group". Let's add tabindex and role="button" to them, or wrap them in <a>
    # It's better to wrap them in <a>, but for now we'll just add tabindex and role for accessibility.
    def make_div_interactive(match):
        cls = match.group(2)
        if 'focus-visible' not in cls:
            return f'{match.group(1)}="{cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" tabindex="0" role="link"{match.group(3)}'
        return match.group(0)
    
    content = re.sub(r'(<div[^>]+class)="([^"]+cursor-pointer[^"]+)"([^>]*>)', make_div_interactive, content)

    with open('src/pages/index.astro', 'w') as f:
        f.write(content)

fix_index()

