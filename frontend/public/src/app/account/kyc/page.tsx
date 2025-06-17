'use client';

import { Button, Checkbox } from '@/components';
import {
  DatePicker,
  FileUploader,
  Input,
  Select,
  TextArea,
} from '@/components/forms';

import React from 'react';
import styles from './page.module.scss';
import { useKYC } from '@/hooks';

const KYCPage = () => {
  const {
    handleSubmitAdditionalDocuments,
    handleSubmitDocumentInformation,
    handleSubmitDocumentUpload,
    handleSubmitPersonalInformation,
    handleSubmitSelfieVerification,
    handleSubmitTermsAndSubmit,
    onSubmitAdditionalDocuments,
    onSubmitDocumentInformation,
    onSubmitDocumentUpload,
    onSubmitPersonalInformation,
    onSubmitSelfieVerification,
    onSubmitTermsAndSubmit,
    registerAdditionalDocuments,
    registerDocumentInformation,
    registerPersonalInformation,
    onCheckAgreeTerms,
    onCheckConsentProcessing,
    onPreviousStep,
    onSelectBirthDate,
    uploadBankStatement,
    uploadDocumentBack,
    uploadDocumentFront,
    uploadSelfie,
    uploadUtilityBill,
    showBackDocument,
    termsAndSubmitValues,
    personalInformationValues,
    step,
    selfieRef,
    bankStatementRef,
    documentBackRef,
    documentFrontRef,
    utilityBillRef,
  } = useKYC();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>KYC Verification</h1>
        <p>
          Complete your identity verification to start trading securely on our
          P2P crypto platform
        </p>
        <div className={styles.securityBadge}>
          Bank-level security & encryption
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.stepsContainer}>
          {/* Personal Information Section */}
          {step === 0 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitPersonalInformation(
                onSubmitPersonalInformation
              )}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>1</span>
                Personal Information
              </h2>

              <div className={styles.infoBox}>
                <h4>Why do we need this information?</h4>
                <p>
                  As a regulated crypto trading platform, we&apos;re required to
                  verify your identity to comply with anti-money laundering
                  (AML) and know-your-customer (KYC) regulations.
                </p>
              </div>

              <div className={styles.formGroup}>
                <Input
                  label="Full Name"
                  register={registerPersonalInformation}
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <DatePicker
                    label="Date of Birth"
                    onSelect={onSelectBirthDate}
                    selectedDate={personalInformationValues.birthDate}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Select
                    name="nationality"
                    id="nationality"
                    register={registerPersonalInformation}
                    options={[
                      {
                        label: 'Select your nationality',
                        value: 'dfdfh',
                      },
                    ]}
                    label="Nationality"
                  />
                  {/* <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select your nationality</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                  <option value="JP">Japan</option>
                  <option value="SG">Singapore</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="ZA">South Africa</option>
                  <option value="OTHER">Other</option>
                </select> */}
                </div>
              </div>
              <Button
                padding="1rem"
                size={18}
                className={styles.buttonRight}
                type="submit"
              >
                Next
              </Button>
            </form>
          )}

          {/* Document Information Section */}
          {step === 1 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitDocumentInformation(
                onSubmitDocumentInformation
              )}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>2</span>
                Document Information
              </h2>

              <div className={styles.infoBox}>
                <h4>Select your preferred ID document</h4>
                <p>
                  Choose a government-issued photo ID that you have readily
                  available. Make sure it&apos;s valid and not expired.
                </p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Select
                    id="documentType"
                    name="documentType"
                    register={registerDocumentInformation}
                    options={[
                      {
                        label: 'Select document type',
                        value: 'fgjmngh',
                      },
                    ]}
                    label="Document Type"
                  />
                  {/* <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select document type</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="NATIONAL_ID">National ID Card</option>
                  <option value="DRIVER_LICENSE">Driver's License</option>
                  <option value="RESIDENCE_PERMIT">Residence Permit</option>
                  <option value="VOTER_ID">Voter ID</option>
                  <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
                  <option value="SOCIAL_SECURITY_CARD">
                    Social Security Card
                  </option>
                </select> */}
                </div>
                <div className={styles.formGroup}>
                  <Input
                    name="documentNumber"
                    id="documentNumber"
                    register={registerDocumentInformation}
                    placeholder="Document Number"
                    label="Document Number"
                    required
                  />
                </div>
              </div>

              <div className={styles.requirementsList}>
                <h4>Document Requirements</h4>
                <ul>
                  <li>Must be a valid, government-issued photo ID</li>
                  <li>All text must be clearly visible and legible</li>
                  <li>Photo must be in color and high quality</li>
                  <li>Document must not be expired</li>
                  <li>All four corners of the document must be visible</li>
                  <li>
                    No screenshots or photocopies - original document photos
                    only
                  </li>
                </ul>
              </div>

              <div className={styles.bottomButtons}>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  onClick={onPreviousStep}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Document Upload Section */}
          {step === 2 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitDocumentUpload(onSubmitDocumentUpload)}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>3</span>
                Document Upload
              </h2>

              <div className={styles.warningBox}>
                <h4>Important Tips for Best Results</h4>
                <p>
                  • Use good lighting and avoid shadows • Keep the document flat
                  • Take photos directly above the document • Ensure all text is
                  readable • File size should be under 10MB
                </p>
              </div>

              <div className={styles.documentGrid}>
                <FileUploader
                  allowMultiple={false}
                  allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                  label="Document Front"
                  description="Images (PNG, JPEG, WEBP) files"
                  maxFileSize={2 * 1024 * 1024} // 2MB
                  maxFiles={1}
                  fullWidth
                  ref={documentFrontRef}
                  onUpload={uploadDocumentFront}
                />
                {showBackDocument && (
                  <FileUploader
                    allowMultiple={false}
                    allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                    label="Document Back"
                    description="Images (PNG, JPEG, WEBP) files"
                    maxFileSize={2 * 1024 * 1024} // 2MB
                    maxFiles={1}
                    ref={documentBackRef}
                    onUpload={uploadDocumentBack}
                  />
                )}
              </div>

              <div className={styles.bottomButtons}>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  onClick={onPreviousStep}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Selfie Verification Section */}
          {step === 3 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitSelfieVerification(
                onSubmitSelfieVerification
              )}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>4</span>
                Selfie Verification
              </h2>

              <div className={styles.infoBox}>
                <h4>Take a selfie for identity verification</h4>
                <p>
                  We need to verify that you&apos;re the same person shown in
                  your ID document. This helps prevent identity theft and keeps
                  our platform secure.
                </p>
              </div>

              <FileUploader
                allowMultiple={false}
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                label="Upload Selfie"
                description="Images (PNG, JPEG, WEBP) files"
                maxFileSize={2 * 1024 * 1024} // 2MB
                maxFiles={1}
                ref={selfieRef}
                onUpload={uploadSelfie}
              />

              <div className={styles.requirementsList}>
                <h4>Selfie Requirements</h4>
                <ul>
                  <li>Face should be clearly visible and well-lit</li>
                  <li>Remove sunglasses, hats, or face coverings</li>
                  <li>Look directly at the camera</li>
                  <li>Keep a neutral expression</li>
                  <li>
                    Photo should be recent (taken within the last 6 months)
                  </li>
                  <li>Make sure your face matches the ID document photo</li>
                </ul>
              </div>

              <div className={styles.bottomButtons}>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  onClick={onPreviousStep}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Additional Documents Section */}
          {step === 4 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitAdditionalDocuments(
                onSubmitAdditionalDocuments
              )}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>5</span>
                Additional Documents (Optional)
              </h2>

              <div className={styles.infoBox}>
                <h4>Supporting documents</h4>
                <p>
                  You can upload additional documents to support your
                  verification. This is optional but may help speed up the
                  review process.
                </p>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <FileUploader
                    allowMultiple={false}
                    allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                    label="Utility Bill"
                    description="Images (PNG, JPEG, WEBP) files"
                    maxFileSize={2 * 1024 * 1024} // 2MB
                    maxFiles={1}
                    ref={utilityBillRef}
                    onUpload={uploadUtilityBill}
                  />
                </div>

                <div className={styles.formGroup}>
                  <FileUploader
                    allowMultiple={false}
                    allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                    label="Bank Statement"
                    description="Images (PNG, JPEG, WEBP) files"
                    maxFileSize={2 * 1024 * 1024} // 2MB
                    maxFiles={1}
                    fullWidth
                    ref={bankStatementRef}
                    onUpload={uploadBankStatement}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <TextArea
                  register={registerAdditionalDocuments}
                  id="additionalNotes"
                  name="aditionalNotes"
                  label="Additional Notes"
                  placeholder="Any additional information you'd like to provide (optional)"
                />
              </div>

              <div className={styles.bottomButtons}>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  onClick={onPreviousStep}
                  type="button"
                >
                  Previous
                </Button>
                <Button
                  padding="1rem"
                  size={18}
                  className={styles.buttonRight}
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Terms and Submit Section */}
          {step === 5 && (
            <form
              className={styles.section}
              onSubmit={handleSubmitTermsAndSubmit(onSubmitTermsAndSubmit)}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>6</span>
                Terms & Submit
              </h2>

              <div className={styles.warningBox}>
                <h4>Processing Time & Next Steps</h4>
                <p>
                  Your KYC verification will typically be processed within 1-3
                  business days. You&apos;ll receive an email notification once
                  the review is complete. During peak times, processing may take
                  up to 5 business days.
                </p>
              </div>
              <div className={styles.checkboxGroup}>
                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy, and I confirm that all information provided is accurate and up-to-date. I understand that providing false information may result in account suspension."
                  checked={termsAndSubmitValues.agreeTerms}
                  id="agreeTerms"
                  required
                  onClick={onCheckAgreeTerms}
                  name="agreeTerms"
                />
                {/* <label htmlFor="termsAgree">
                I agree to the{' '}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                , and I confirm that all information provided is accurate and
                up-to-date. I understand that providing false information may
                result in account suspension.
              </label> */}
              </div>

              <div className={styles.checkboxGroup}>
                <Checkbox
                  label="I consent to the processing of my personal data for KYC
                verification purposes and understand that my data will be
                handled in accordance with applicable data protection laws."
                  checked={termsAndSubmitValues.consentProcessing}
                  id="consentProcessing"
                  onClick={onCheckConsentProcessing}
                  required
                  name="consentProcessing"
                />
              </div>

              <Button
                type="submit"
                padding="1rem"
                size={18}
                theme="gradient"
                fullWidth
              >
                Submit KYC Application
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
