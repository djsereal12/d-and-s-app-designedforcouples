import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedPressable } from '@/components/AnimatedPressable';

export default function AuthScreen() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithApple, signInWithGoogle } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home');
    }
  }, [user, router]);

  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    console.log('[AuthScreen] Email auth attempt:', isSignUp ? 'sign up' : 'sign in', email);
    setSubmitting(true);
    setError('');
    try {
      if (isSignUp) {
        await signUpWithEmail(email.trim(), password, name.trim() || undefined);
      } else {
        await signInWithEmail(email.trim(), password);
      }
    } catch (e: any) {
      console.error('[AuthScreen] Email auth error:', e);
      setError(e?.message || 'Authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApple = async () => {
    console.log('[AuthScreen] Apple sign in pressed');
    setError('');
    setSubmitting(true);
    try {
      await signInWithApple();
    } catch (e: any) {
      if (!e?.message?.includes('cancel')) {
        setError(e?.message || 'Apple sign in failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    console.log('[AuthScreen] Google sign in pressed');
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      if (!e?.message?.includes('cancel')) {
        setError(e?.message || 'Google sign in failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B9D" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#F4F0EB', '#EEE7E0', '#E4DDD4', '#DED5CC']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>Together</Text>
            <Text style={styles.tagline}>A calmer way to stay connected</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
            <Text style={styles.cardSubtitle}>
              {isSignUp ? 'Start your journey together' : 'Sign in to continue'}
            </Text>

            {/* Apple Sign In — FIRST per App Store requirement */}
            <AnimatedPressable onPress={handleApple} style={styles.appleBtn} disabled={submitting}>
              <Text style={styles.appleBtnText}>🍎  Sign in with Apple</Text>
            </AnimatedPressable>

            {/* Google Sign In */}
            <AnimatedPressable onPress={handleGoogle} style={styles.googleBtn} disabled={submitting}>
              <Text style={styles.googleBtnText}>G  Sign in with Google</Text>
            </AnimatedPressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email/Password Form */}
            {isSignUp && (
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#C4A0B5"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#C4A0B5"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#C4A0B5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <AnimatedPressable
              onPress={handleEmailAuth}
              style={[styles.primaryBtn, submitting && styles.disabledBtn]}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.primaryBtnText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
              )}
            </AnimatedPressable>

            <Pressable onPress={() => { setIsSignUp(!isSignUp); setError(''); }} style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <Text style={styles.toggleLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F1EC',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  appName: {
    fontSize: 58,
    fontWeight: '900',
    color: '#1E1B19',
    letterSpacing: -3,
    lineHeight: 60,
    fontFamily: 'cursive',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(30,27,25,0.72)',
    marginTop: 10,
    fontWeight: '500',
    letterSpacing: -0.3,
    fontFamily: 'cursive',
  },
  card: {
    backgroundColor: '#F9F7F4',
    borderRadius: 30,
    padding: 28,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderColor: 'rgba(30,27,25,0.06)',
    boxShadow: '0 14px 42px rgba(0,0,0,0.06)',
  } as any,
  cardTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1E1B19',
    marginBottom: 4,
    letterSpacing: -1,
    fontFamily: 'cursive',
  },
  cardSubtitle: {
    fontSize: 17,
    color: '#6F665F',
    marginBottom: 24,
    fontWeight: '400',
    fontFamily: 'cursive',
  },
  appleBtn: {
    backgroundColor: '#1E1B19',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  appleBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D9D0C8',
  },
  googleBtnText: {
    color: '#1E1B19',
    fontSize: 17,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1D7CF',
  },
  dividerText: {
    fontSize: 14,
    color: '#706761',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F1EDE8',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 17,
    color: '#1E1B19',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D9CFC3',
  },
  errorText: {
    color: '#9C4C3E',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  primaryBtn: {
    backgroundColor: '#1E1B19',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 4,
  },
  disabledBtn: {
    opacity: 0.72,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'cursive',
  },
  toggleRow: {
    alignItems: 'center',
    marginTop: 22,
  },
  toggleText: {
    fontSize: 15,
    color: '#706761',
    fontFamily: 'cursive',
  },
  toggleLink: {
    color: '#1E1B19',
    fontWeight: '700',
    fontFamily: 'cursive',
  },
});
