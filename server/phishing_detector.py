import re

SUSPICIOUS_KEYWORDS = [
    'login', 'verify', 'update', 'bank', 'secure', 'account', 'webscr', 'ebayisapi', 'signin', 'wp-content', 'confirm', 'submit', 'admin', 'wp-login'
]

def extract_features(url: str):
    features = {
        'length': len(url),
        'has_at': '@' in url,
        'num_dots': url.count('.'),
        'has_https': url.startswith('https://'),
        'suspicious_keywords': any(kw in url.lower() for kw in SUSPICIOUS_KEYWORDS),
    }
    return features

def simple_phishing_detector(url: str):
    features = extract_features(url)
    score = 0
    # Rule-based scoring
    if features['length'] > 75:
        score += 1
    if features['has_at']:
        score += 1
    if features['num_dots'] > 4:
        score += 1
    if not features['has_https']:
        score += 1
    if features['suspicious_keywords']:
        score += 1
    # Decision
    if score >= 4:
        return 'phishing', 0.95
    elif score >= 2:
        return 'suspicious', 0.6
    else:
        return 'safe', 0.9 