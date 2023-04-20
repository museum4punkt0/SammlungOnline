UPDATE smb.stt_platform_config SET link_template = 'https://themen.smb.museum/sammlungen-online/:lang/story/:slug'  where platform_key = 'SMB';
UPDATE smb.stt_platform_config SET link_template = 'https://islamic-art.smb.museum/:lang/story/:slug'               where platform_key = 'ISL';
UPDATE smb.stt_platform_config SET link_template = 'https://themen.smb.museum/hamburger-bahnhof/:lang/story/:slug'  where platform_key = 'HBF';
UPDATE smb.stt_platform_config SET link_template = 'https://themen.smb.museum/kunstgewerbemuseum/:lang/story/:slug' where platform_key = 'KGM';
