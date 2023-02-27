import { ChangeEvent } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IBanner } from '../../../../types/banner';
import { BannerValidationErrors } from '../../../../types/validation';

interface IBannerFormProps {
    formValues: IBanner;
    errors: BannerValidationErrors;
    handleChange: (e: ChangeEvent<HTMLInputElement>, object: any, type?: string) => void;
}

const BannerForm = ({ formValues, errors, handleChange }: IBannerFormProps) => (
    <div>
        <h3 className="font-medium mb-2">Banner</h3>
        {formValues.publicId && (
            <img src={formValues.bannerUrl} alt="uploaded banner" className="w-13 h-15 max-w-full mb-3" />
        )}
        <div className="flex items-center mb-3">
            <label htmlFor="file-upload" className="flex items-center">
                <FaCloudUploadAlt />
                <span className="pl-2 mr-2">Alegeți imaginea:</span>
            </label>
            <input
                type="file"
                accept="image/png, image/jpeg"
                id="file-upload"
                onChange={(e) => handleChange(e, formValues, 'image')}
            />
        </div>
        {formValues.imageLocalUrl && (
            <img src={formValues.imageLocalUrl} alt="banner" className="w-13 h-15 max-w-full" />
        )}
    </div>
);

export default BannerForm;
